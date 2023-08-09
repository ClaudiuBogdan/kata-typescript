import ArrayList from "./index";
import { test_list } from "@utils/tests";

test("array-list", function () {
    const list = new ArrayList<number>(3);
    test_list(list);
});
