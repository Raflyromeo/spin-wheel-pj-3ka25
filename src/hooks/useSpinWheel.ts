import { useState, useCallback, useRef } from 'react';
import { determineSpinResult } from '@/lib/spinLogic';

export type SpinData = {
  names: string[];
  courses: string[];
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
    
    const { nameTargetIndex, courseTargetIndex } = determineSpinResult(currentData.names, currentData.courses);
    
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

  const removeResult = useCallback(() => {
    if (result) {
      setData(prev => {
        const newNames = prev.names.filter(n => n !== result.name);
        const newCourses = prev.courses.filter(c => c !== result.course);
        
        setNamesText(newNames.join('\n'));
        setCoursesText(newCourses.join('\n'));

        return { names: newNames, courses: newCourses };
      });
      setResult(null);
    }
  }, [result]);

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
