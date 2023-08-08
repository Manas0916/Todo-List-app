package com.example.backend.services;

import com.example.backend.enities.Tasks;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Random;

@Service
public class TaskServiceImpl implements TaskService{

    ArrayList<Tasks> list;

    public TaskServiceImpl(){
        list = new ArrayList<>();
        list.add(new Tasks(1, "wake up early bro", false));
        list.add(new Tasks(2, "Check if there any e-mails in your inbox", false));
    }
    @Override
    public ArrayList<Tasks> getTasks() {
        return list;
    }

    @Override
    public Tasks addTask(Tasks tasks) {
        Random obj = new Random();
        int id = obj.nextInt(1000000000);
        tasks.setId(id);
        tasks.setChecked(false);
        list.add(tasks);
        return tasks;
    }

    @Override
    public ArrayList<Tasks> updateTask(Tasks tasks, Integer id) {

        int idx = 0;
        for(int i = 0; i < list.size(); i++)
        {
            Tasks it = list.get(i);
            if(it.getId() == id){
                idx = i;
                break;
            }
        }
        list.set(idx, tasks);
        return list;
    }

    @Override
    public Tasks deleteTask(Integer id) {
       Tasks curr = null;
        for (Tasks it : list) {
            if (it.getId() == id) {
                curr = it;
                break;
            }
        }
        list.remove(curr);
        return curr;
    }
}
