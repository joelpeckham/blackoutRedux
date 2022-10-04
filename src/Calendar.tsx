import "./Calendar.css";
import { SVG } from '@svgdotjs/svg.js';
import Metaballs from "./Metaballs";


const circles = [
    {
      cx: 200,
      cy: 100,
      r: 64
    },
    {
      cx: 300,
      cy: 300,
      r: 96
    },
    {
      cx: 250,
      cy: 475,
      r: 56
    },
    {
      cx: 350,
      cy: 675,
      r: 128
    },
    {
      cx: 600,
      cy: 800,
      r: 76
    }
  ]

class CalSquare {
  num: number;
  active: boolean;
  constructor(num: number, active: boolean) {
    this.num = num;
    this.active = active;
  }
  render(): JSX.Element {
    let htmlClass = this.active ? "cal-square active" : "cal-square inactive";
    return (
      <div className={htmlClass}>
        <p>{this.num}</p>
      </div>
    );
  }
}

class CalendarModel {
  date: Date;
  squares: CalSquare[];
  constructor(month: number, year: number) {
    this.date = new Date(year, month, 1); // 1st of month
    this.squares = this.makeSquares();
  }
  monthName(): string {
    return this.date.toLocaleString("default", { month: "long" });
  }
  year(): number {
    return this.date.getFullYear();
  }
  daysInMonth(): number {
    return this.date.getDate();
  }
  startingDayOfWeek(): number {
    return this.date.getDay();
  }
  makeSquares(): CalSquare[] {
    let squares: CalSquare[] = [];
    let startOffset = this.startingDayOfWeek();
    let startDate = new Date(this.date);
    startDate.setDate(startDate.getDate() - startOffset);
    for (let i = 0; i < 6 * 7; i++) {
      let active = startDate.getMonth() === this.date.getMonth();
      squares.push(new CalSquare(startDate.getDate(), active));
      startDate.setDate(startDate.getDate() + 1);
    }
    return squares;
  }
}

function makeGoo(): JSX.Element {
  let draw = SVG();
  draw.viewbox(0, 0, 700, 700);
  draw.size("100%", "100%");
  draw.circle(100).fill("#f0f0f0");
  draw.circle(100).move(100,0).fill("#f0f0f0");
  return <div dangerouslySetInnerHTML={{__html: draw.svg()}}></div>;
}
function Calendar() {
  let model = new CalendarModel(9, 2022);
  let squares = model.squares.map((square) => square.render());
  let shortDays = ["S", "M", "T", "W", "T", "F", "S"].map((day) => (
    <div className="cal-square header">
      <p>{day}</p>
    </div>
  ));
  return (
    <div className="Calendar">
      <div className="Cal-Header">
        <h1>{model.monthName()}</h1>
        <h2>{model.year()}</h2>
      </div>
      <div className="gooWrapper">
        <div className="Cal-Body">
          {shortDays}
          {squares}
        </div>
        <div className="gooey">
            <Metaballs
        circles={circles} />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
