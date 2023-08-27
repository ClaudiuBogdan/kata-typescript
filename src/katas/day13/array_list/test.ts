import ArrayList from "./index";
import { test_list } from "@utils/tests";

describe('Array list', () => {
    test('prepend', ()=>{
        const arr = new ArrayList()
        arr.prepend(1)
        expect(arr.get(0)).toEqual(1)
        arr.prepend(2)
        expect(arr.get(0)).toEqual(2)
    })

    test('insertAt', () => {
        const arr = new ArrayList();
        arr.insertAt('three', 3)
        expect(arr.get(3)).toEqual('three')
        expect(arr.get(0)).toEqual(undefined)
        expect(arr.get(1)).toEqual(undefined)
        expect(arr.get(2)).toEqual(undefined)
        expect(arr.length).toEqual(4)
    })

    test('append', () => {
        const arr = new ArrayList();
        arr.append(1)
        expect(arr.length).toEqual(1)
        expect(arr.get(0)).toEqual(1)
        arr.append(2)
        expect(arr.length).toEqual(2)
        expect(arr.get(1)).toEqual(2)


    })

    test('removeAt', ()=> {
        const arr = new ArrayList();
        arr.append(1)
        expect(arr.length).toEqual(1)
        expect(arr.get(0)).toEqual(1)
        arr.removeAt(0)
        expect(arr.length).toEqual(0)
        expect(arr.get(0)).toEqual(undefined)

        arr.append(1)
        arr.append(2)
        arr.removeAt(0)
        expect(arr.get(0)).toEqual(2)
        expect(arr.length).toEqual(1)
    })

    test("array-list", function () {
        const list = new ArrayList<number>(3);
        test_list(list);
    });    
})