const layout = require("../layout");

module.exports = ({  product }) => {
    return layout({
        content: `
          <form method="POST">
            <imput name+"title" value="${product.title}" />
            <imput name+"price" value="${product.price}" />
            <input name+"image" type="file" />
            <button>Submit</button>
          </form>
        `
    });
};