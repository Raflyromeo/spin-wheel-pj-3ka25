export function announceResult(name: string, course: string, isSoundEnabled: boolean = true) {
  if (!isSoundEnabled || typeof window === 'undefined') return;
  
  const text = `Selamat kepada ${name} atas penunjukannya sebagai Penanggung Jawab mata kuliah ${course}`;
  
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.rate = 0.9; 
  utterance.pitch = 1.0;
  
  window.speechSynthesis.speak(utterance);
}
