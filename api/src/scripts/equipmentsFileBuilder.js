// This script allows us to create a smaller file from the gigantic BPE csv data (~600mb)
// it was used to create a smaller json file which was then gzipped.
// It stays in history because it could be useful to create other files the next years
// source pour les correspondances : https://www.insee.fr/fr/metadonnees/source/operation/s2027/bases-donnees-ligne

const { createReadStream, writeFileSync } = require('fs')
const csv = require('csv-parse')

const output = []

createReadStream('../assets/datas/bpe21_xy.csv')
  .pipe(
    csv.parse({
      columns: true,
      skip_empty_lines: true,
      delimiter: ';',
      trim: true,
    })
  )
  .on('data', function (row) {
    output.push({
      depcom: row.DEPCOM,
      typequ: row.TYPEQU,
    })
  })
  .on('end', function () {
    writeFileSync(
      '../assets/datas/BPE2021-tweaked.json',
      JSON.stringify(output)
    )
    console.log('done')
  })
