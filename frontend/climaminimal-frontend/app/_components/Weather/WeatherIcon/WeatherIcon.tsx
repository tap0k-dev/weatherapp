import { IconType } from 'react-icons';
import {
  WiDaySunny,
  WiCloudy,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from 'react-icons/wi';

interface WeatherIconProps {
  wmoCode: number;
  size?: number;
  className?: string;
}

const wmoIconMap: Record<number, IconType> = {
  0: WiDaySunny,
  1: WiCloudy,
  2: WiCloudy,
  3: WiCloudy,
  45: WiFog,
  48: WiFog,
  61: WiRain,
  63: WiRain,
  71: WiSnow,
  95: WiThunderstorm,
};

export default function WeatherIcon(props: WeatherIconProps) {
  const IconComponent = wmoIconMap[props.wmoCode] ?? WiDaySunny;

  return <IconComponent size={props.size} className={props.className} />;
}
