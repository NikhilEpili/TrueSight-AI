import os
import discord
from discord.ext import commands
import aiohttp
import tempfile
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

# Initialize bot
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'{bot.user} has connected to Discord!')

@bot.command(name='verify')
async def verify_media(ctx):
    """
    Verify attached media for potential manipulation.
    Usage: !verify [attach media file]
    """
    if not ctx.message.attachments:
        await ctx.send('Please attach a media file to verify.')
        return

    attachment = ctx.message.attachments[0]
    file_type = attachment.content_type

    # Determine endpoint based on file type
    if file_type.startswith('image/'):
        endpoint = 'http://localhost:8000/api/detection/image'
    elif file_type.startswith('video/'):
        endpoint = 'http://localhost:8000/api/detection/video'
    elif file_type.startswith('audio/'):
        endpoint = 'http://localhost:8000/api/detection/audio'
    else:
        await ctx.send('Unsupported file type. Please upload an image, video, or audio file.')
        return

    # Download attachment
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        await attachment.save(temp_file.name)
        temp_path = temp_file.name

    try:
        # Send file to API
        async with aiohttp.ClientSession() as session:
            with open(temp_path, 'rb') as f:
                form_data = aiohttp.FormData()
                form_data.add_field('file', f)
                
                async with session.post(endpoint, data=form_data) as response:
                    if response.status != 200:
                        await ctx.send('Error analyzing media.')
                        return
                    
                    result = await response.json()

        # Create embed with results
        embed = discord.Embed(
            title='TrueSight Analysis Results',
            color=discord.Color.red() if result['is_fake'] else discord.Color.green()
        )

        embed.add_field(
            name='Verdict',
            value='⚠️ Potential Manipulation Detected' if result['is_fake'] else '✅ No Manipulation Detected',
            inline=False
        )

        embed.add_field(
            name='Confidence',
            value=f"{result['confidence'] * 100:.1f}%",
            inline=True
        )

        # Add analysis details
        for key, value in result['analysis'].items():
            formatted_key = ' '.join(word.capitalize() for word in key.split('_'))
            status = '🚫 Detected' if value else '✅ Not Detected'
            embed.add_field(name=formatted_key, value=status, inline=True)

        await ctx.send(embed=embed)

    except Exception as e:
        await ctx.send(f'Error: {str(e)}')
    finally:
        os.unlink(temp_path)

@bot.command(name='checktext')
async def verify_text(ctx, *, text: str):
    """
    Verify text for potential misinformation.
    Usage: !checktext [text to verify]
    """
    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                'http://localhost:8000/api/news/text',
                json={'text': text}
            ) as response:
                if response.status != 200:
                    await ctx.send('Error analyzing text.')
                    return
                
                result = await response.json()

        # Create embed with results
        embed = discord.Embed(
            title='TrueSight Text Analysis',
            description=text[:100] + '...' if len(text) > 100 else text,
            color=discord.Color.red() if result['is_fake'] else discord.Color.green()
        )

        embed.add_field(
            name='Verdict',
            value='⚠️ Potential Misinformation' if result['is_fake'] else '✅ No Issues Detected',
            inline=False
        )

        embed.add_field(
            name='Confidence',
            value=f"{result['confidence'] * 100:.1f}%",
            inline=True
        )

        if result.get('explanation'):
            embed.add_field(
                name='Analysis',
                value=result['explanation'],
                inline=False
            )

        if result.get('warnings'):
            warnings = '\n'.join(f'• {warning}' for warning in result['warnings'])
            embed.add_field(
                name='Warnings',
                value=warnings,
                inline=False
            )

        await ctx.send(embed=embed)

    except Exception as e:
        await ctx.send(f'Error: {str(e)}')

@bot.command(name='help')
async def help_command(ctx):
    """Show help information about the bot."""
    embed = discord.Embed(
        title='TrueSight Bot Commands',
        description='Here are the available commands:',
        color=discord.Color.blue()
    )

    embed.add_field(
        name='!verify',
        value='Verify attached media (image/video/audio) for potential manipulation.\nUsage: `!verify [attach file]`',
        inline=False
    )

    embed.add_field(
        name='!checktext',
        value='Verify text for potential misinformation.\nUsage: `!checktext [text to verify]`',
        inline=False
    )

    embed.add_field(
        name='!help',
        value='Show this help message.',
        inline=False
    )

    await ctx.send(embed=embed)

if __name__ == '__main__':
    bot.run(TOKEN)
