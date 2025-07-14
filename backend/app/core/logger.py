import logging
import sys
from typing import Any

# Configure logging format
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

class Logger:
    @staticmethod
    def info(message: Any) -> None:
        logging.info(message)
    
    @staticmethod
    def error(message: Any) -> None:
        logging.error(message)
    
    @staticmethod
    def warning(message: Any) -> None:
        logging.warning(message)
    
    @staticmethod
    def debug(message: Any) -> None:
        logging.debug(message)

logger = Logger() 