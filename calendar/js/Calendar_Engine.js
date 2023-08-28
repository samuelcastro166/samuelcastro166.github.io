/**
 * @author Samuel de Castro Figueira
 */
class Calendar {
     /**@param {Number} index*/
     month_name(index) { let name = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]; return name[index] };
     /**@param {Number} index*/
     day_name(index) { let name = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"]; return name[index] };
     time = function (index) {//completed
          if (index === 0) { return console.error('"0 is not a valid year!"') };
          return {
               year: index,
               get leapyear() { if ((index % 4 === 0 && index % 100 !== 0) || index % 400 === 0) { return true } else { return false } },
               get yearLength() { return this.leapyear ? 366 : 365},
               monthLength(n) { let len = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; if (this.leapyear) { len[1] = 29 }; return len[n]; }
          }
     };
     //
     /**
      * @param {String} a
      * @param {String} b
     */
     getInDaysFrom = function (a, b) {//completed
          let ioA = a.indexOf("/"), lioA = a.lastIndexOf("/");
          let ioB = b.indexOf("/"), lioB = b.lastIndexOf("/");
          let ya = Number(a.slice(lioA + 1)), ma = Number(a.slice(ioA + 1, lioA)), da = Number(a.slice(0, ioA));
          let yb = Number(b.slice(lioB + 1)), mb = Number(b.slice(ioB + 1, lioB)), db = Number(b.slice(0, ioB));
          //catching errors
          //change parameters if a is greater then b
          if ((ya > yb) || (ya == yb && ma > mb) || (ya == yb && ma == mb && da > db)) {
               let aa = { y: ya, m: ma, d: da };
               let bb = { y: yb, m: mb, d: db };
               ya = bb.y; ma = bb.m; da = bb.d;
               yb = aa.y; mb = aa.m; db = aa.d;
          };

          let result;
          if (ya != yb) {//ok
               let ygap = 0;
               for (let i = ya + 1; i < yb; i++) { ygap += this.time(i).yearLength };//ok!!!

               let mgap = 0;
               for (let i = ma; i < 12; i++) { mgap += this.time(ya).monthLength(i) }//ok!!!
               for (let i = mb - 2; i > -1; i--) { mgap += this.time(yb).monthLength(i) }//ok!!!

               let dgap = (this.time(ya).monthLength(ma - 1) - da) + db;//ok!!!
               result = ygap + mgap + dgap;
          }
          else if (ya == yb && ma != mb) {//ok
               let mgap = 0;
               for (let i = ma; i < mb - 1; i++) { mgap += this.time(ya).monthLength(i) }//

               let dgap = (this.time(ya).monthLength(ma - 1) - da) + db;//ok!!!
               result = mgap + dgap;
          }
          else if (da != db) { result = db - da }//ok
          else { result = 0 }
          return result;
     };
     //calculate days
     /**
      * @param {Number} date 
      * @param {Number} month 
      * @param {Number} year 
      * @tutorial calc_day returns a number between 0 to 6 representing the days of the week's resprective position.
      * If no parameter is defined it will return the index of the current day.
      * The sintax must be day, month, and year in this exact order.
      * Remember, this function do not work as the same as an array index,
      * but just like the usual way, january is 01, and desember is 12.
      * @example new Calendar().calc_day(25,02,2000);
      */
     calc_day = function (a) {//completed
          let ioA = a.indexOf("/"), lioA = a.lastIndexOf("/");
          let ya = Number(a.slice(lioA + 1)), ma = Number(a.slice(ioA + 1, lioA)), da = Number(a.slice(0, ioA));
          let date = `${da}/${ma}/${ya}`
          let days = this.getInDaysFrom("0/01/1", date);
          return days % 7;
     };
};