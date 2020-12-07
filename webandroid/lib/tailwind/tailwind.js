import {create} from 'tailwind-rn';
import styles from './styles.json';
 
const {tailwind, getColor} = create(styles);
const size = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
};
export {tailwind, getColor, size};