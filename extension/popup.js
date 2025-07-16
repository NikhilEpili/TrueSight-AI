document.getElementById("verify-page").onclick = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab.url;
  const res = await fetch("http://localhost:8000/api/verify/url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });
  const data = await res.json();
  document.getElementById("result").innerText = data.verdict || JSON.stringify(data);
};

document.getElementById("verify-text").onclick = async () => {
  const text = document.getElementById("input-text").value;
  if (!text) {
    document.getElementById("result").innerText = "Please enter text to verify.";
    return;
  }
  const res = await fetch("http://localhost:8000/api/verify/text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  const data = await res.json();
  document.getElementById("result").innerText = data.verdict || JSON.stringify(data);
};

document.getElementById("verify-image").onclick = async () => {
  const imageUrl = document.getElementById("input-text").value;
  if (!imageUrl) {
    document.getElementById("result").innerText = "Please enter an image URL to verify.";
    return;
  }
  try {
    const blob = await fetch(imageUrl).then(r => r.blob());
    const formData = new FormData();
    formData.append("file", blob, "image.jpg");
    const res = await fetch("http://localhost:8000/api/verify/image", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    document.getElementById("result").innerText = data.verdict || JSON.stringify(data);
  } catch (e) {
    document.getElementById("result").innerText = "Error: " + e.message;
  }
};
