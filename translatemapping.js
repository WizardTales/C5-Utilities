const KcAdminClient = require('keycloak-admin').default;

const seqLength = 8;
const fs = require('fs');
const Promise = require('bluebird');
const csv = require('csv-parser');

const iso27 = [
  '4.1',
  '4.2',
  '4.3',
  '4.4',
  '5.1',
  '5.2',
  '5.3',
  '6.1',
  '6.1.1',
  '6.1.2',
  '6.1.3',
  '6.2',
  '6.3',
  '7.1',
  '7.2',
  '7.3',
  '7.4',
  '7.5',
  '7.5.1',
  '7.5.2',
  '7.5.3',
  '8.1',
  '8.2',
  '8.3',
  '9.1',
  '9.2',
  '9.2.1',
  '9.2.2',
  '9.3',
  '9.3.1',
  '9.3.2',
  '9.3.3',
  '10.1',
  '10.2'
];

const isoA = [

  '5.1',
  '5.2',
  '5.3',
  '5.4',
  '5.5',
  '5.6',
  '5.7',
  '5.8',
  '5.9',
  '5.1',
  '5.11',
  '5.12',
  '5.13',
  '5.14',
  '5.15',
  '5.16',
  '5.17',
  '5.18',
  '5.19',
  '5.2',
  '5.21',
  '5.22',
  '5.23',
  '5.24',
  '5.25',
  '5.26',
  '5.27',
  '5.28',
  '5.29',
  '5.3',
  '5.31',
  '5.32',
  '5.33',
  '5.34',
  '5.35',
  '5.36',
  '5.37',
  '6.1',
  '6.2',
  '6.3',
  '6.4',
  '6.5',
  '6.6',
  '6.7',
  '6.8',
  '7.1',
  '7.2',
  '7.3',
  '7.4',
  '7.5',
  '7.6',
  '7.7',
  '7.8',
  '7.9',
  '7.1',
  '7.11',
  '7.12',
  '7.13',
  '7.14',
  '8.1',
  '8.2',
  '8.3',
  '8.4',
  '8.5',
  '8.6',
  '8.7',
  '8.8',
  '8.9',
  '8.1',
  '8.11',
  '8.12',
  '8.13',
  '8.14',
  '8.15',
  '8.16',
  '8.17',
  '8.18',
  '8.19',
  '8.2',
  '8.21',
  '8.22',
  '8.23',
  '8.24',
  '8.25',
  '8.26',
  '8.27',
  '8.28',
  '8.29',
  '8.3',
  '8.31',
  '8.32',
  '8.33',
  '8.34'
];

async function start () {
  const profit = 0;
  const db = { ZEUR: 66267.963, XXBT: 0, XETH: 0, XLTC: 0 };
  const ref = { };
  const i = 0;
  const last = '';
  const m = fs.createWriteStream('./parsedmapping.csv', 'utf8');
  const f =
       fs.createReadStream('/home/tobi/Downloads/mappingiso27001a2c5.csv', 'utf8')
         .pipe(csv({ separator: ',' })).on('data', (data) => {
           let s = '';
           const destLines = data.dest.split('\n');
           for (const line of destLines) {
             if (line === '-') continue;
             if (line === '') continue;
             if (line.indexOf('-') !== -1) {
               const range = line.split('-');
               range[0] = range[0].trim();
               range[1] = range[1].trim();
               const list = range[0][0] === 'A' ? isoA : iso27;

               let std;
               if (range[0][0] === 'A') {
                 std = 'ISO 27002:2022';
                 range[0] = range[0].substring(2);
                 range[1] = range[1].substring(2);
               } else {
                 std = 'ISO 27001:2022';
               }

               let i = list.indexOf(range[0]);
               const end = list.indexOf(range[1]);
               for (; i < end + 1; ++i) {
                 console.log(list, i, range, line);
                 s = `${s}"C5","${data.source.split('-')[0]}","${data.source}","${std}","${list[i].split('.')[0]}","${list[i]}"\n`;
               }
             } else {
               const r = line.split('.');
               let item;
               let std;
               if (r[0] === 'A') {
                 std = 'ISO 27002:2022';
                 item = line.substring(2);
                 r.shift();
               } else {
                 std = 'ISO 27001:2022';
                 item = line;
               }
               s = `${s}"C5","${data.source.split('-')[0]}","${data.source}","${std}","${r[0]}","${item}"\n`;
             }
           }

           m.write(s);
           console.log(s);
         })
         .on('end', () => {
           console.log(db, ref);
           m.close();
         });
}

start();
