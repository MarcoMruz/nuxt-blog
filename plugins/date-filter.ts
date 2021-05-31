import Vue from 'vue'

const dateFilter = (value: Date) => {
  return formatDate(value)
}

function formatDate(inputDate: Date) {
  return new Intl.DateTimeFormat('sk').format(new Date(inputDate))
}

Vue.filter('date', dateFilter)
