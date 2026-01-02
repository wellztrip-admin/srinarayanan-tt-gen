import * as XLSX from 'xlsx';
import { TimetableCombination } from '@/types/timetable';

const CLASS_DURATION = 40; // minutes

export function exportToExcel(combinations: TimetableCombination[]) {
  const workbook = XLSX.utils.book_new();

  combinations.forEach((combination) => {
    const { schoolA, schoolB, id } = combination;

    // School A Sheet (Morning - Periods 1-4)
    const schoolAData: (string | number)[][] = [
      [`Combination ${id} - ${schoolA.school.name} - Morning Session (Periods 1-4)`],
      [`Class Duration: ${CLASS_DURATION} minutes each`],
      [],
      ['Day', 'Period 1', 'Period 2', 'Period 3', 'Period 4'],
    ];

    schoolA.schedule.forEach((daySchedule) => {
      const row: string[] = [daySchedule.day];
      daySchedule.slots.forEach((slot) => {
        row.push(`${slot.subject}\n(${slot.teacher.name})`);
      });
      schoolAData.push(row);
    });

    // Add teacher summary for School A
    schoolAData.push([]);
    schoolAData.push(['Teacher Summary']);
    const teacherPeriodsA: Record<string, number> = {};
    schoolA.schedule.forEach((day) => {
      day.slots.forEach((slot) => {
        teacherPeriodsA[slot.teacher.name] = (teacherPeriodsA[slot.teacher.name] || 0) + 1;
      });
    });
    Object.entries(teacherPeriodsA).forEach(([name, count]) => {
      schoolAData.push([name, `${count} periods (${count * CLASS_DURATION} mins)`]);
    });

    const wsA = XLSX.utils.aoa_to_sheet(schoolAData);
    wsA['!cols'] = [{ wch: 12 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(workbook, wsA, `C${id} - ${schoolA.school.name}`.slice(0, 31));

    // School B Sheet (Afternoon - Periods 5-8)
    const schoolBData: (string | number)[][] = [
      [`Combination ${id} - ${schoolB.school.name} - Afternoon Session (Periods 5-8)`],
      [`Class Duration: ${CLASS_DURATION} minutes each`],
      [],
      ['Day', 'Period 5', 'Period 6', 'Period 7', 'Period 8'],
    ];

    schoolB.schedule.forEach((daySchedule) => {
      const row: string[] = [daySchedule.day];
      daySchedule.slots.forEach((slot) => {
        row.push(`${slot.subject}\n(${slot.teacher.name})`);
      });
      schoolBData.push(row);
    });

    // Add teacher summary for School B
    schoolBData.push([]);
    schoolBData.push(['Teacher Summary']);
    const teacherPeriodsB: Record<string, number> = {};
    schoolB.schedule.forEach((day) => {
      day.slots.forEach((slot) => {
        teacherPeriodsB[slot.teacher.name] = (teacherPeriodsB[slot.teacher.name] || 0) + 1;
      });
    });
    Object.entries(teacherPeriodsB).forEach(([name, count]) => {
      schoolBData.push([name, `${count} periods (${count * CLASS_DURATION} mins)`]);
    });

    const wsB = XLSX.utils.aoa_to_sheet(schoolBData);
    wsB['!cols'] = [{ wch: 12 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(workbook, wsB, `C${id} - ${schoolB.school.name}`.slice(0, 31));
  });

  // Combined Summary Sheet
  const summaryData: (string | number)[][] = [
    ['Timetable Summary - All Combinations'],
    [`Class Duration: ${CLASS_DURATION} minutes each`],
    [`Total Combinations: ${combinations.length}`],
    [],
  ];

  combinations.forEach((combination) => {
    const { schoolA, schoolB, id } = combination;
    
    summaryData.push([`Combination ${id}`]);
    summaryData.push(['School', 'Session', 'Days', 'Periods']);
    summaryData.push([schoolA.school.name, 'Morning', 'Mon-Sat', '1-4']);
    summaryData.push([schoolB.school.name, 'Afternoon', 'Thu-Sat', '5-8']);
    summaryData.push([]);
    
    // Teacher workload for this combination
    summaryData.push(['Teacher Workload']);
    summaryData.push(['Teacher', 'Total Periods', 'Total Time']);
    
    const totalPeriods: Record<string, number> = {};
    schoolA.schedule.forEach((day) => {
      day.slots.forEach((slot) => {
        totalPeriods[slot.teacher.name] = (totalPeriods[slot.teacher.name] || 0) + 1;
      });
    });
    schoolB.schedule.forEach((day) => {
      day.slots.forEach((slot) => {
        totalPeriods[slot.teacher.name] = (totalPeriods[slot.teacher.name] || 0) + 1;
      });
    });
    
    Object.entries(totalPeriods).forEach(([name, count]) => {
      summaryData.push([name, count, `${count * CLASS_DURATION} mins`]);
    });
    
    summaryData.push([]);
    summaryData.push([]);
  });

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  wsSummary['!cols'] = [{ wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];
  XLSX.utils.book_append_sheet(workbook, wsSummary, 'Summary');

  // Download
  const fileName = `Timetable_All_Combinations.xlsx`;
  XLSX.writeFile(workbook, fileName);
}
