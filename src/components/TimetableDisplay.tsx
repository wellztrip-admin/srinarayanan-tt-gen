import { TimetableCombination } from '@/types/timetable';
import { getSubjectColor } from '@/utils/timetableGenerator';
import { Calendar, Sun, Moon, Clock } from 'lucide-react';

interface TimetableDisplayProps {
  combination: TimetableCombination;
}

const CLASS_DURATION = 40; // minutes

export function TimetableDisplay({ combination }: TimetableDisplayProps) {
  const { schoolA, schoolB } = combination;
  
  // Calculate teacher period counts
  const teacherPeriods: Record<string, { morning: number; afternoon: number }> = {};
  
  schoolA.schedule.forEach((day) => {
    day.slots.forEach((slot) => {
      if (!teacherPeriods[slot.teacher.name]) {
        teacherPeriods[slot.teacher.name] = { morning: 0, afternoon: 0 };
      }
      teacherPeriods[slot.teacher.name].morning++;
    });
  });
  
  schoolB.schedule.forEach((day) => {
    day.slots.forEach((slot) => {
      if (!teacherPeriods[slot.teacher.name]) {
        teacherPeriods[slot.teacher.name] = { morning: 0, afternoon: 0 };
      }
      teacherPeriods[slot.teacher.name].afternoon++;
    });
  });
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Teacher Workload Summary */}
      <div className="bg-accent/30 rounded-xl border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-primary" />
          <h4 className="font-semibold text-foreground">Teacher Workload Summary</h4>
          <span className="text-xs text-muted-foreground">(Each class: {CLASS_DURATION} mins)</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(teacherPeriods).map(([name, counts]) => (
            <div key={name} className="bg-card rounded-lg p-3 border border-border">
              <div className="font-medium text-sm text-foreground truncate">{name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {counts.morning + counts.afternoon} periods ({(counts.morning + counts.afternoon) * CLASS_DURATION} mins)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* School A Timetable */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="bg-schoolA-light border-b border-schoolA/20 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-schoolA/10">
              <Calendar className="w-5 h-5 text-schoolA" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                {schoolA.school.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sun className="w-4 h-4 text-morning" />
                <span>Morning Session • Periods 1-4 • {CLASS_DURATION} mins each</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Day</th>
                {[1, 2, 3, 4].map((period) => (
                  <th key={period} className="px-4 py-3 text-center text-sm font-semibold text-foreground">
                    Period {period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schoolA.schedule.map((daySchedule, idx) => (
                <tr key={daySchedule.day} className={idx % 2 === 0 ? 'bg-card' : 'bg-muted/20'}>
                  <td className="px-4 py-3 font-medium text-foreground">{daySchedule.day}</td>
                  {daySchedule.slots.map((slot) => (
                    <td key={slot.period} className="px-4 py-3">
                      <div className={`px-3 py-2 rounded-lg border text-center text-sm ${getSubjectColor(slot.subject)}`}>
                        <div className="font-semibold">{slot.subject}</div>
                        <div className="text-xs opacity-80">{slot.teacher.name}</div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* School B Timetable */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="bg-schoolB-light border-b border-schoolB/20 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-schoolB/10">
              <Calendar className="w-5 h-5 text-schoolB" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                {schoolB.school.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Moon className="w-4 h-4 text-afternoon" />
                <span>Afternoon Session • Periods 5-8 • {CLASS_DURATION} mins each</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Day</th>
                {[5, 6, 7, 8].map((period) => (
                  <th key={period} className="px-4 py-3 text-center text-sm font-semibold text-foreground">
                    Period {period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schoolB.schedule.map((daySchedule, idx) => (
                <tr key={daySchedule.day} className={idx % 2 === 0 ? 'bg-card' : 'bg-muted/20'}>
                  <td className="px-4 py-3 font-medium text-foreground">{daySchedule.day}</td>
                  {daySchedule.slots.map((slot, slotIdx) => (
                    <td key={slotIdx} className="px-4 py-3">
                      <div className={`px-3 py-2 rounded-lg border text-center text-sm ${getSubjectColor(slot.subject)}`}>
                        <div className="font-semibold">{slot.subject}</div>
                        <div className="text-xs opacity-80">{slot.teacher.name}</div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
