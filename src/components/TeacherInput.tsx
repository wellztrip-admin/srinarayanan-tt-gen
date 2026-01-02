import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface TeacherInputProps {
  subject: string;
  teacherNumber?: number;
  value: string;
  onChange: (value: string) => void;
  colorClass: string;
}

export function TeacherInput({ subject, teacherNumber, value, onChange, colorClass }: TeacherInputProps) {
  const displayLabel = teacherNumber ? `${subject} Teacher ${teacherNumber}` : `${subject} Teacher`;
  
  return (
    <div className="group">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 rounded-md ${colorClass}`}>
          <User className="w-4 h-4" />
        </div>
        <Label className="text-sm font-medium text-foreground">{displayLabel}</Label>
      </div>
      <Input
        placeholder={`Enter ${subject.toLowerCase()} teacher name`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-card border-border focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}
