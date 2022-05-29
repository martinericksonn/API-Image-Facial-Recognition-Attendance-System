export class Attendance {
  constructor(
    private name: string,
    public id: number,
    private date: string,
    public time: string,
    private classcode: string,
    private department: string,
  ) {}

  log() {
    console.log(
      `${this.name} ${this.id} ${this.date} ${this.time} ${this.classcode} ${this.department}`,
    );
  }

  toJson() {
    return {
      name: this.name,
      employeeId: this.id,
      date: this.date,
      time: this.time,
      classCode: this.classcode,
      department: this.department,
    };
  }
}
