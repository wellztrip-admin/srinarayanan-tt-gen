import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SchoolInput } from './SchoolInput';
import { TeacherInput } from './TeacherInput';
import { FormData } from '@/types/timetable';
import { Users, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface TimetableFormProps {
  onGenerate: (data: FormData) => void;
}

export function TimetableForm({ onGenerate }: TimetableFormProps) {
  const [formData, setFormData] = useState<FormData>({
    schoolAName: '',
    schoolBName: '',
    teachers: {
      maths1: '',
      maths2: '',
      physics: '',
      chemistry: '',
      biology: '',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.schoolAName.trim() || !formData.schoolBName.trim()) {
      toast.error('Please enter both school names');
      return;
    }
    
    const teacherValues = Object.values(formData.teachers);
    if (teacherValues.some(name => !name.trim())) {
      toast.error('Please enter all teacher names');
      return;
    }
    
    onGenerate(formData);
    toast.success('Timetables generated successfully!');
  };

  const updateTeacher = (key: keyof FormData['teachers'], value: string) => {
    setFormData(prev => ({
      ...prev,
      teachers: { ...prev.teachers, [key]: value },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Schools Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
          School Details
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <SchoolInput
            label="School A"
            value={formData.schoolAName}
            onChange={(value) => setFormData(prev => ({ ...prev, schoolAName: value }))}
            schedule="Morning (4 Classes)"
            days="Monday - Saturday"
            variant="A"
          />
          <SchoolInput
            label="School B"
            value={formData.schoolBName}
            onChange={(value) => setFormData(prev => ({ ...prev, schoolBName: value }))}
            schedule="Afternoon (4 Classes)"
            days="Thursday - Saturday"
            variant="B"
          />
        </div>
      </div>

      {/* Teachers Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
          <Users className="w-5 h-5" />
          Teacher Details
        </h2>
        
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <TeacherInput
              subject="Maths"
              teacherNumber={1}
              value={formData.teachers.maths1}
              onChange={(value) => updateTeacher('maths1', value)}
              colorClass="bg-maths/10 text-maths"
            />
            <TeacherInput
              subject="Maths"
              teacherNumber={2}
              value={formData.teachers.maths2}
              onChange={(value) => updateTeacher('maths2', value)}
              colorClass="bg-maths/10 text-maths"
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <TeacherInput
              subject="Physics"
              value={formData.teachers.physics}
              onChange={(value) => updateTeacher('physics', value)}
              colorClass="bg-physics/10 text-physics"
            />
            <TeacherInput
              subject="Chemistry"
              value={formData.teachers.chemistry}
              onChange={(value) => updateTeacher('chemistry', value)}
              colorClass="bg-chemistry/10 text-chemistry"
            />
            <TeacherInput
              subject="Biology"
              value={formData.teachers.biology}
              onChange={(value) => updateTeacher('biology', value)}
              colorClass="bg-biology/10 text-biology"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button 
          type="submit" 
          size="lg"
          className="px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Generate 3 Timetable Combinations
        </Button>
      </div>
    </form>
  );
}
