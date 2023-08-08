package com.example.backend.enities;

import java.util.ArrayList;

public class Tasks {
    private long id;
    String text;
    boolean checked;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTasks() {
        return text;
    }

    public void setTasks(String tasks) {
        this.text = tasks;
    }

    public Tasks() {
        super();
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public Tasks(long id, String tasks, boolean checked) {
        this.id = id;
        this.text = tasks;
        this.checked = checked;
    }

    @Override
    public String toString() {
        return "Tasks{" +
                "id=" + id +
                ", tasks=" + text +
                '}';
    }

}
