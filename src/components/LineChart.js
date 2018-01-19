import {Line} from 'vue-chartjs'

export default {
  extends: Line,
  props: {
      labels: Array,
      datasets: Array,
      data: []
  },
  mounted () {

    this.renderChart({
      labels: this.labels,
      datasets: this.datasets
    }, {responsive: true, maintainAspectRatio: false})

  }
}
