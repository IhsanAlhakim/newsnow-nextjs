import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Menurut beberapa website, hal ini dilakukan untuk mencegah serangan XSS
// pakai html-react-parser katanya ke terhindar dari XSS

export function createMarkup(dirty: string) {
  return {
    __html: DOMPurify(new JSDOM("<!DOCTYPE html>").window).sanitize(dirty),
  };
}
