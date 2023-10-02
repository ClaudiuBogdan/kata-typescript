import * as path from "path";
import * as utils from "./utils";
import * as align from "./align-configs";

export const generate = (katas: MetaData[]) => {
    const dayPath = utils.createDayDirectory();

    katas.forEach((kata) => {
        const kataName = kata.id.split("/").pop()!;
        const targetPath = path.join(dayPath, kataName);
        utils.copyTemplate(targetPath, kata.templatePath);
    });

    align.package_json(dayPath);
    align.stats(utils.katasPath);
};
