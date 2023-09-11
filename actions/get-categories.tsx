import { Category } from "@/types";

const URL = 'https://shop.folouu.com/wp-json/wc/v2/products/categories';

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL, {
    headers: {
      Authorization: 'Basic Y2tfZGQ4MzljNzc1YTliOWNjNGI4MzAwM2YwYWE4ODc0NDMxZTQzMmU4Zjpjc18zNDI0ZjczZTUwOTU3MGI1ZWQ2Y2RlODgyYzUzMjQzYTEyZTM2ZWE3',
      Cookie: 'mailpoet_page_view=%7B%22timestamp%22%3A1693494494%7D',
    },
  });

  return res.json();
};

export default getCategories;