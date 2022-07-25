import { parse } from 'csv-parse'

export function csvToArrayJson(data, options = {}) {
  return new Promise((resolve, reject) => {
    parse(
      data,
      {
        columns: true,
        skip_empty_lines: true,
        delimiter: ';',
        trim: true,
        ...options,
      },
      (err, output) => {
        if (err) reject(err)
        else resolve(output)
      }
    )
  }).then((list) =>
    list.map((tab) => {
      const obj = {}
      for (const p in tab) {
        obj[
          p
            .replace(/ /g, '_')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
        ] = tab[p]
      }

      return obj
    })
  )
}
