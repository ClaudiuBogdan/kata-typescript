import { test_list } from "@utils/tests";
import LinkedList from "./index";

test("DoublyLinkedList", function () {
    const list = new LinkedList<number>();
    test_list(list);
});
