// /dashboard/summary/summary.js

export function summarizeText(text) {
    if (!text) return "";

    const sentences = text.split(". ");  // Split the text into sentences.
    const numSentences = Math.max(1, Math.floor(sentences.length / 2));  // Select about 1/2 of the sentences instead of 1/3.

    // Simple summarization: Pick the first few sentences.
    const summary = sentences.slice(0, numSentences).join(". ");

    return summary ? summary + "." : "No summary available.";
}
