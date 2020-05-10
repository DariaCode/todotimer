/* ----------------------------------------------------
React.js / Helper function for dates

Updated: 05/10/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

// "2020-05-08T18:05:54.025Z"
const today = new Date().toISOString();

// "2020-05-08"
const todayDate = today.split('T')[0];

// "5/8/2020"
const todayLocalDate = new Date().toLocaleDateString();

const draftTomorrow = new Date(today);
const formatedTomorrow = draftTomorrow.setDate(draftTomorrow.getDate() + 1);
const formatedWeek = draftTomorrow.setDate(draftTomorrow.getDate() + 7);

// "2020-05-09T18:09:29.566Z"
const tomorrow = new Date(formatedTomorrow).toISOString();

// "2020-05-09"
const tomorrowDate = tomorrow.split('T')[0];

// "5/9/2020"
const tomorrowLocalDate = new Date(formatedTomorrow).toLocaleDateString();

// "2020-05-16T18:17:11.295Z"
const week = new Date(formatedWeek).toISOString();

// "2020-05-16"
const weekDate = week.split('T')[0];

// "5/16/2020"
const weekLocalDate = new Date(formatedWeek).toLocaleDateString();

const localDate = [todayLocalDate];
const draftLocal = new Date(today);
for (let i=0; i<6; i++) {
  const nextLocalDay = draftLocal.setDate(draftLocal.getDate() - 1);
  localDate.push(new Date(nextLocalDay).toLocaleDateString());
}
const localDates = localDate.reverse();

export {today, todayDate, todayLocalDate, tomorrow,
  tomorrowDate, tomorrowLocalDate, week, weekDate, weekLocalDate,
  localDates};
