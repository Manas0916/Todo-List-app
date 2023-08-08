package com.example.backend.services;

import com.example.backend.enities.Tasks;

import java.util.ArrayList;

public interface TaskService {

    public ArrayList<Tasks> getTasks();
    public Tasks addTask(Tasks tasks);

    public ArrayList<Tasks> updateTask(Tasks tasks, Integer id);

    public Tasks deleteTask(Integer id);
}
