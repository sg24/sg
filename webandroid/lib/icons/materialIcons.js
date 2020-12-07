import * as Font from 'expo-font';
import { createIconSet } from '@expo/vector-icons';
import fontList from './lib/MaterialIcon.ttf';
import iconSet from './lib/materialIcons.json';

const glyphMap = iconSet;
const CustomIcon = createIconSet(glyphMap, 'materialIcons', fontList);
export default CustomIcon;