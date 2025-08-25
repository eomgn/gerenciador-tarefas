import { app } from "@/app";

import { env } from "@/env";

const PORT = env.PORT; // definindo uma porta para rodar o servidor local

app.listen(PORT, () => console.log(`Server is running on ${PORT} 🚀`));
