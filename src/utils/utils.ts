import axios from 'axios';
import { jsonServer, paginateLimit } from '../../contants';

export const sectionCenter = 'w-[90vw] max-w-[1280px] mx-auto';
const wait = (delay: number) => new Promise((res) => setTimeout(res, delay));

export const isClickedOnItemOrChildInItem = <T>(
  element: HTMLElement,
  elementToCompare: T
): Boolean => {
  return (
    element.parentElement === elementToCompare || element === elementToCompare
  );
};

export const isBothPrimitiveEqual = <T>(val1: T, val2: T) => val1 === val2;

export const isLengthEqualToLimit = (postCount: number) =>
  postCount === paginateLimit;
