import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';
import { Todos } from './data/todoList';
export default {
  start() {
    let mock = new MockAdapter(axios);

    mock.onGet('/todo/list').reply(() => {
      let mockTodo = Todos.map(todo => {
        return {
          id: todo.id,
          title: todo.title,
          count: todo.record.filter(data => {
            if (data.checked == false) return true;
            return false;
          }).length, // 过滤record里面 ‘checked’ 为true的数据，因为它们已经被完成了
          locked: todo.locked,
          isDelete: todo.isDelete
        };
      }).filter(todo => {
        if (todo.isDelete === true) return false; // 过滤掉 ‘isDelete’为true，因为已经被删除了。
        return true;
      });

      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            200,
            {
              todos: mockTodo // 返回状态为200，并且返回todos数据
            }
          ]);
        }, 200);
      });
    });

    // 新增一条todo
    mock.onPost('/todo/addTodo').reply(() => {
      Todos.push({
        id: Mock.Random.guid(),
        title: 'newList',
        isDelete: false,
        locked: false,
        record: []
      });
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });

    // 获取单个todo列表
    mock.onGet('todo/listId').reply(config => {
      let id = config.params.id;
      let todo = Todos.find(todo => {
        return id && todo.id === id;
      });
      todo
        ? (todo.count = todo
            ? todo.record.filter(data => {
                return data.checked == false;
              }).length
            : null)
        : false;

      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            200,
            {
              todo: todo
            }
          ]);
        }, 200);
      });
    });

    // 新增todo
    mock.onPost('todo/addRecord').reply(config => {
      let { id, text } = JSON.parse(config.data);
      // let { id, text } =
      //   typeof config == 'string' ? JSON.parse(config) : config;
      Todos.some(t => {
        if (t.id == id) {
          t.record.push({
            text: text,
            isDelete: false,
            checked: false
          });
          return true;
        }
      });
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });

    mock.onPost('/todo/editTodo').reply(config => {
      let { todo } = JSON.parse(config.data);
      Todos.some(t => {
        if (t.id === todo.id) {
          t.title = todo.title;
          t.locked = todo.locked;
          t.isDelete = todo.isDelete;
          return true;
        }
      });
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });

    mock.onPost('/todo/editRecord').reply(config => {
      let { id, record, index } = JSON.parse(config.data);
      Todos.some(t => {
        if (t.id === id) {
          t.record[index] = record;
          return true;
        }
      });
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });
  }
};
