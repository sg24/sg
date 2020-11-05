import * as Font from 'expo-font';
import { createIconSet } from '@expo/vector-icons';
import fontList from './lib/Ionicon.ttf';
import iconSet from './lib/ionicons.json';

const glyphMap = iconSet;
const CustomIcon = createIconSet(glyphMap, 'ionicons', fontList);
export default CustomIcon;