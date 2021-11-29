import { client, CombinedField, Field, Query } from "@tilework/opus";

client.setEndpoint("http://localhost:4000/");

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
      new Field("products")
        .addFieldList(["id", "name", "gallery", "inStock"])
        .addField(new Field("prices").addFieldList(["currency", "amount"]))
    );

  client
    .post(products)
    .then((result) => success(result.category.products))
    .catch((err) => error(err));
}
