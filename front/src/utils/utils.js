import moment from 'moment'
import { useEffect, useRef, useState } from 'react'

moment.locale('fr', {
  months:
    'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
      '_'
    ),
  monthsShort:
    'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  monthsParseExact: true,
  weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[Aujourd’hui à] LT',
    nextDay: '[Demain à] LT',
    nextWeek: 'dddd [à] LT',
    lastDay: '[Hier à] LT',
    lastWeek: 'dddd [dernier à] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans',
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal(number) {
    return number + (number === 1 ? 'er' : 'e')
  },
  meridiemParse: /PD|MD/,
  isPM(input) {
    return input.charAt(0) === 'M'
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem(hours /* , minutes, isLower */) {
    return hours < 12 ? 'PD' : 'MD'
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // Used to determine first week of the year.
  },
})

moment.locale('fr')

// === STRING UTILS ===

export const ucFirst = (s) => {
  if (typeof s !== 'string') return ''
  return s?.charAt(0)?.toUpperCase() + s?.slice(1)
}

export const capitalize = (string) => ucFirst(string?.toLowerCase())

export const wordsCapitalize = (s) => {
  const wordBreakerChar = [' ', "'", '-', '.'] // on met une majuscule à la suite de ces caractères
  s = s.toLowerCase()
  wordBreakerChar.forEach(breaker => {
    s = s.split(breaker)
      .map(w => ucFirst(w))
      .join(breaker)
  })
  return s
}

// === DATE UTILS ===

export const thereAre = (date) => moment(date)
    .subtract(1, "hours")
    .fromNow()

export const formatDate = (date) => date.toLocaleDateString("fr-FR")

export function getXDaysAgo(date) {
  const daysAgo = moment().diff(date, "days")
  if (daysAgo > 0) {
    return `${daysAgo} jour${daysAgo > 1 ? 's' : ''}`
  }

  let hoursAgo = moment().diff(date, "hours") + 1
  if (hoursAgo < 1) {
    return "moins d'une heure"
  }
  return `${hoursAgo} heure${hoursAgo > 1 ? 's' : ''}`
}

const numberFormatter = Intl.NumberFormat()
export const formatNumber = (number) => numberFormatter.format(Math.floor(number))

export const useElementOnScreen = (options) => {
  const containerRef = useRef()
  const [isVisible, setIsVisible] = useState(false)

  const callbackFunction = (entries) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)
    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [containerRef, options])

  return [containerRef, isVisible]
}

export const formatCityTension = (tension) => {
  if (tension < 4) {
    return "Opportunités d'emploi"
  }
  return "Peu d'opportunités d'emploi"
}

// trie selon le boost de visibilité : 5 > 3 > 2 > null > null ...
export const visibilityBoostSorter = (a, b) => (!b?.visibility_boost ? -1 : b?.visibility_boost - a?.visibility_boost)

// === URL UTILS ===

export const formatCityUrl = (city, codeRome) => {
  let url = `/city/${city.insee_com}-${city.nom_comm}`
  if (!!codeRome) {
    url += `?codeRome=${codeRome}`
  }

  return url
}

export const formatHelpUrl = (help) => `/aides/${help.slug}`

// ======

export function distance(
  lat1,
  lon1,
  lat2,
  lon2,
  unit = 'K'
) {
  if (lat1 === lat2 && lon1 === lon2) {
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
    if (unit === 'K') {
      dist = dist * 1.609344
    }
    if (unit === 'N') {
      dist = dist * 0.8684
    }
    return dist
  }
}