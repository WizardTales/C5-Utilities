const KcAdminClient = require('keycloak-admin').default;

const seqLength = 8;
const fs = require('fs');
const Promise = require('bluebird');
const csv = require('csv-parser');

async function start () {
  const profit = 0;
  const db = { ZEUR: 66267.963, XXBT: 0, XETH: 0, XLTC: 0 };
  const ref = { };
  const i = 0;
  const last = '';
  const m = fs.createWriteStream('./parsedstandard.csv', 'utf8');
  const f =
       fs.createReadStream('/home/tobi/Downloads/C5_2020_editable.csv', 'utf8')
         .pipe(csv({ separator: ';' })).on('data', (data) => {
           let s = '';
           for (const c of ['Basic Criteria', 'Additional Criteria']) {
             s = `${s}${c}\n\n${data[c]}\n-----\n`;
           }

           let g = '';
           for (const c of ['Supplementary Information -\nAbout the Criteria',
             'Supplementary Information -\nComplementary Customer Criteria',
             'Supplementary Information -\nNotes on Continuous Auditing - Feasibility',
             'Supplementary Information -\nNotes on Continuous Auditing']) {
             g = `${g}${c}\n\n${data[c]}\n-----\n`;
           }
           m.write(`"${s.replace(/"/g, '""')}","${g.replace(/"/g, '""')}"\n`);
           console.log(s, g);
         })
         .on('end', () => {
           console.log(db, ref);
           m.close();
         });
}

start();
