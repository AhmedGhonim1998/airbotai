const HF_API_KEY = "hf_your_api_key"; // حط الـ key بتاعك من HuggingFace

async function getEmbedding(text) {
  const response = await fetch(
    "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    }
  );
  return await response.json(); // بيرجع array فيه vector
}

function cosineSimilarity(vec1, vec2) {
  const dotProduct = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
  const mag1 = Math.sqrt(vec1.reduce((acc, val) => acc + val * val, 0));
  const mag2 = Math.sqrt(vec2.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (mag1 * mag2);
}

async function search() {
  const query = document.getElementById("query").value;
  if (!query) return;

  const queryEmbedding = await getEmbedding(query);

  const res = await fetch("data.json");
  const problems = await res.json();

  let bestMatch = null;
  let bestScore = -1;

  for (const problem of problems) {
    const problemEmbedding = await getEmbedding(problem.question);
    const score = cosineSimilarity(queryEmbedding[0], problemEmbedding[0]);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = problem;
    }
  }

  document.getElementById("result").innerText =
    bestMatch && bestScore > 0.7
      ? `أقرب نتيجة: ${bestMatch.answer}`
      : "لم أجد تطابق دقيق للمشكلة.";
}
