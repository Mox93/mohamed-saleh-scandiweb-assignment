import { client, CombinedField, Field, Query } from "@tilework/opus";

client.setEndpoint("http://localhost:4000/");

const pricesField = new Field("prices").addFieldList(["currency", "amount"]);
const itemsField = new Field("items").addFieldList([
  "id",
  "displayValue",
  "value",
]);
const attributesField = new Field("attributes").addFieldList([
  "id",
  "name",
  "type",
  itemsField,
]);

export function fetchSettings({ success, error }) {
  const categories = new Query("categories", true).addField("name");
  const currencies = new Query("currencies", true);

  client
    .post(new CombinedField().add(categories).add(currencies))
    .then((result) => success(result))
    .catch((err) => error(err));
}

export function fetchProducts(category, { success, error }) {
  const products = new Query("category")
    .addArgument("input", "CategoryInput", { title: category })
    .addField(
      new Field("products").addFieldList([
        "id",
        "name",
        "brand",
        "gallery",
        "inStock",
        attributesField,
        pricesField,
      ])
    );

  client
    .post(products)
    .then((result) => success(result.category.products))
    .catch((err) => error(err));
}

export function fetchProduct(id, { success, error }) {
  const product = new Query("product")
    .addArgument("id", "String!", id)
    .addFieldList([
      "id",
      "name",
      "gallery",
      "inStock",
      "description",
      "category",
      "brand",
      attributesField,
      pricesField,
    ]);

  client
    .post(product)
    .then((result) => success(result.product))
    .catch((err) => error(err));
}
