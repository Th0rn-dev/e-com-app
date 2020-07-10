const layout = require("../layout");

module.export = ({ req }) => {
    return layout({
        content: `
            <div>
                Your id is: ${req.session.userId}
                <form method="post">
                   <input name="email" placeholder="email" />
                      <input name="password" placeholder="password" />
                   <input name="confirm" placeholder="password confirmation" />
                    <button>Sing Up</button>
                 </form>
            </div>
    `
    });
};
