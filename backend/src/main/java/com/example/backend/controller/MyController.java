package com.example.backend.controller;

import com.example.backend.enities.Tasks;
import com.example.backend.services.TaskServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class MyController {

    @Autowired
    private TaskServiceImpl taskService;
    @GetMapping("/tasks")
    public ArrayList<Tasks> getTasks() {
        return this.taskService.getTasks();
    }

    @PostMapping("/tasks")
    public Tasks addTasks(@RequestBody Tasks tasks){
        return this.taskService.addTask(tasks);
    }

    @PutMapping("/tasks/{id}")
    public ArrayList<Tasks> updateTask(@RequestBody Tasks task, @PathVariable Integer id){
        return this.taskService.updateTask(task, id);
    }

    @DeleteMapping("/tasks/{id}")
    public Tasks deleteTask(@PathVariable Integer id ){
        return this.taskService.deleteTask(id);
    }
}
