import moment from 'moment'
import _ from 'lodash'
import {
  IS_LARGE_CITY,
  IS_MEDIUM_CITY,
  IS_SMALL_CITY,
} from '../constants/criterion'

export function arrayToObjectByKey(data, key, keepRef = true) {
  const object = data.reduce((acc, cur) => {
    if (keepRef) {
      acc[cur[key]] = cur
    } else {
      acc[cur[key]] = { ...cur }
    }
    return acc
  }, {})
  return object
}

export function arrayToObjectByKeys(
  data,
  keys,
  separator = '-',
  keepRef = true
) {
  const object = data.reduce((acc, cur) => {
    let key = ''
    for (const k in keys) {
      key += `${cur[keys[k]] || ''}`
      if (k < keys.length - 1) {
        key += `${separator}`
      }
    }
    if (keepRef) {
      acc[key] = cur
    } else {
      acc[key] = { ...cur }
    }
    return acc
  }, {})
  return object
}

export function ucFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function cleanUrl(url) {
  return url.replace(/\/+/g, '/')
}

export function dateFormatYYYYMMDD(
  date = null,
  offset = 0,
  offsetType = 'days'
) {
  date = moment(date ? date : undefined)
  date.add(offset, offsetType)
  return date.format('YYYY-MM-DD')
}

export function dateFormatYYYYMMDDHH(
  date = null,
  offset = 0,
  offsetType = 'hours'
) {
  date = moment(date ? date : undefined)
  date.add(offset, offsetType)
  return date.format('YYYY-MM-DD HH:00:00')
}

export function dateFormatTimestamp(date = null) {
  return Math.floor(moment(date ? date : undefined).format('X'))
}

export function dateFormatTimestampDay(date = null) {
  return Math.floor(moment(date ? date : undefined).format('X') / 60 / 60 / 24)
}

export function dateFormatTimestampHour(date = null) {
  return Math.floor(moment(date ? date : undefined).format('X') / 60 / 60)
}

export function dateFormatTimestampDayToYYYYMMDD(timestampDay = 0) {
  return moment(0).add(timestampDay, 'days').format('YYYY-MM-DD')
}

export function dateFormatTimestampHourToYYYYMMDDHH(timestampHour = 0) {
  return moment(0).add(timestampHour, 'hours').format('YYYY-MM-DD HH:00:00')
}

export function dateDiff(
  startDate = null,
  endDate = null,
  offsetType = 'days'
) {
  startDate = moment(startDate ? startDate : undefined)
  endDate = moment(endDate ? endDate : undefined)
  return endDate.diff(startDate, offsetType)
}

export function timeDiff(startDate = null, endDate = null) {
  startDate = startDate ? new Date(startDate) : new Date()
  endDate = endDate ? new Date(endDate) : new Date()
  return endDate.getTime() - startDate.getTime()
}

export function round(number) {
  if (!number) {
    return 0
  }
  return Math.round(+number * 100) / 100
}

/**
 * Take a csv string and return a json object
 *
 * @param {string} csv csv string
 * @param {(','|';')} [separator=','] data separator in csv string
 * @return {(Object)} Return a json object or an empty object if something goes wrong (bad csv format or wrong separator)
 */
export function csvToJson(csv, separator = ',') {
  let toArray = csv
    .trim()
    .replace(/"/g, '')
    .split('\n')
    .map((el) => el.split(separator))

  const titles = toArray.shift()

  if (
    !titles ||
    !toArray[0] ||
    titles.length !== toArray[0].length ||
    toArray.filter((el) => el.length !== toArray[0].length)[0] !== undefined
  )
    return []

  const toJSON = toArray.map((el) => {
    let object = {}
    for (const index in el) object[titles[index]] = el[index]
    return object
  })

  return toJSON
}

export function arrayIsEqual(arr1, arr2) {
  _.isEqual(_.sortBy(arr1), _.sortBy(arr2))
}

export function distanceBetweenToCoordinates(
  lat1,
  lon1,
  lat2,
  lon2,
  unit = 'K'
) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0
  } else {
    var radlat1 = (Math.PI * lat1) / 180
    var radlat2 = (Math.PI * lat2) / 180
    var theta = lon1 - lon2
    var radtheta = (Math.PI * theta) / 180
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == 'K') {
      dist = dist * 1.609344
    }
    if (unit == 'N') {
      dist = dist * 0.8684
    }
    return dist
  }
}

export function sleep(duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
export function citySizeLabel(city) {
  if (city.population >= IS_LARGE_CITY) {
    return 'Métropole'
  } else if (city.population >= IS_MEDIUM_CITY) {
    return 'Grande ville'
  } else if (city.population >= IS_SMALL_CITY) {
    return 'Ville moyenne'
  } else {
    return 'Petite ville'
  }
}
