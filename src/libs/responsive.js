import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
import { RFPercentage } from 'react-native-responsive-fontsize'

const parseValue = (value) => {
  if (typeof value === 'number') {
    return value
  } else if (typeof value === 'string') {
    const isPercentage = value.endsWith('%')

    if (isPercentage) {
      const numericPart = parseFloat(value)

      if (!isNaN(numericPart) && isFinite(numericPart)) {
        return numericPart
      }
    }

    const parsedValue = parseFloat(value)

    if (!isNaN(parsedValue) && isFinite(parsedValue)) {
      return parsedValue
    }
  }
}

const Responsive = {
  width,
  height,
  getWidth: (value) => {
    const parsedValue = parseValue(value)
    let responsiveWidth = 0
    responsiveWidth = width * (parsedValue / 100)
    return responsiveWidth
  },
  getHeight: (value) => {
    const parsedValue = parseValue(value)
    let responsiveHeight = 0
    responsiveHeight = height * (parsedValue / 100)
    return responsiveHeight
  },
  AppFonts: {
    h1: RFPercentage(4.5),
    h2: RFPercentage(4.0),
    h3: RFPercentage(3.5),
    h4: RFPercentage(3.0),
    h5: RFPercentage(2.5),
    h6: RFPercentage(2.3),
    h7: RFPercentage(2.1),


    t0: RFPercentage(2.3),

    t1: RFPercentage(2.0),
    t2: RFPercentage(1.82),
    t3: RFPercentage(1.5),
    t4: RFPercentage(1.35),
    t4_5: RFPercentage(1.25),

    t5: RFPercentage(1.15),
    t6: RFPercentage(1.05),


    

  },
}

export default Responsive
