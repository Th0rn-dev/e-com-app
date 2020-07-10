const layout = require("../layout");

module.export = () => {
    return layout({
        content: `
        <div>
            <form method="post">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <button>Sing In</button>
           </form>
        </div>
    `
    });
};