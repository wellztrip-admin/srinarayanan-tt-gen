import * as XLSX from 'xlsx';
import { TimetableCombination } from '@/types/timetable';

const CLASS_DURATION = 40; // minutes

export function exportToExcel(combinations: TimetableCombination[]) {
  const workbook = XLSX.utils.book_new();

  combinations.forEach((combination) => {
    const { schoolA, schoolB, id } = combination;

    // Combined sheet for both schools
    const sheetData: (string | number)[][] = [
      [`Combination ${id} - Timetable`],
      [`Class Duration: ${CLASS_DURATION} minutes each`],
      [],
      // School A Header
      [`${schoolA.school.name} - Morning Session (Periods 1-4)`],
      ['Day', 'Period 1', 'Period 2', 'Period 3', 'Period 4'],
    ];

    // School A Schedule
    schoolA.schedule.forEach((daySchedule) => {
      const row: string[] = [daySchedule.day];
      daySchedule.slots.forEach((slot) => {
        row.push(`${slot.subject} (${slot.teacher.name})`);
      });
      sheetData.push(row);
    });

    // Spacer
    sheetData.push([]);
    sheetData.push([]);

    // School B Header
    sheetData.push([`${schoolB.school.name} - Afternoon Session (Periods 5-8)`]);
    sheetData.push(['Day', 'Period 5', 'Period 6', 'Period 7', 'Period 8']);

    // School B Schedule
    schoolB.schedule.forEach((daySchedule) => {
      const row: string[] = [daySchedule.day];
      daySchedule.slots.forEach((slot) => {
        row.push(`${slot.subject} (${slot.teacher.name})`);
      });
      sheetData.push(row);
    });

    // Teacher Summary
    sheetData.push([]);
    sheetData.push([]);
    sheetData.push(['Teacher Workload Summary']);
    sheetData.push(['Teacher', 'Morning Periods', 'Afternoon Periods', 'Total Periods', 'Total Time']);

    const teacherPeriodsA: Record<string, number> = {};
    const teacherPeriodsB: Record<string, number> = {};

    schoolA.schedule.forEach((day) => {
      day.slots.forEach((slot) => {
        teacherPeriodsA[slot.teacher.name] = (teacherPeriodsA[slot.teacher.name] || 0) + 1;
      });
    });

    schoolB.schedule.forEach((day) => {
      day.slots.forEach((slot) => {
        teacherPeriodsB[slot.teacher.name] = (teacherPeriodsB[slot.teacher.name] || 0) + 1;
      });
    });

    const allTeachers = new Set([...Object.keys(teacherPeriodsA), ...Object.keys(teacherPeriodsB)]);
    allTeachers.forEach((name) => {
      const morning = teacherPeriodsA[name] || 0;
      const afternoon = teacherPeriodsB[name] || 0;
      const total = morning + afternoon;
      sheetData.push([name, morning, afternoon, total, `${total * CLASS_DURATION} mins`]);
    });

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    ws['!cols'] = [{ wch: 12 }, { wch: 22 }, { wch: 22 }, { wch: 22 }, { wch: 22 }];
    XLSX.utils.book_append_sheet(workbook, ws, `Combination ${id}`);
  });

  // Download
  const fileName = `Timetable_All_Combinations.xlsx`;
  XLSX.writeFile(workbook, fileName);
}
