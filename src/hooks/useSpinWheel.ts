import { useState, useCallback, useRef } from 'react';

export type SpinData = {
  names: string[];
  courses: string[];
}

// Looping spin logic: absen 1-35, terus looping secara random
function getRandomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

export function useSpinWheel() {
  const [data, setData] = useState<SpinData>({
    names: [],
    courses: []
  });
  
  const [namesText, setNamesText] = useState("");
  const [coursesText, setCoursesText] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<{name: string, course: string} | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const dataRef = useRef(data);
  dataRef.current = data;

  const startSpin = useCallback(() => {
    const currentData = dataRef.current;
    if (currentData.names.length === 0 || currentData.courses.length === 0 || isSpinning) {
      return null;
    }
    
    setIsSpinning(true);
    setResult(null);
    
    // Random selection - loops through all items (not removing)
    const nameTargetIndex = getRandomIndex(currentData.names.length);
    const courseTargetIndex = getRandomIndex(currentData.courses.length);
    
    return { nameTargetIndex, courseTargetIndex };
  }, [isSpinning]);

  const endSpin = useCallback((nameIdx: number, courseIdx: number) => {
    setIsSpinning(false);
    setResult({
      name: dataRef.current.names[nameIdx],
      course: dataRef.current.courses[courseIdx],
    });
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setIsSpinning(false);
  }, []);

  // removeResult: opsional, tidak menghapus dari list (looping)
  const removeResult = useCallback(() => {
    setResult(null);
  }, []);

  const updateText = useCallback((type: 'names' | 'courses', text: string) => {
    if (type === 'names') {
      setNamesText(text);
      setData(prev => ({ ...prev, names: text.split('\n').map(n => n.trim()).filter(Boolean) }));
    } else {
      setCoursesText(text);
      setData(prev => ({ ...prev, courses: text.split('\n').map(c => c.trim()).filter(Boolean) }));
    }
  }, []);

  return {
    data, setData,
    namesText, coursesText, updateText,
    isSpinning, startSpin, endSpin,
    result, reset, removeResult,
    soundEnabled, setSoundEnabled
  };
}
