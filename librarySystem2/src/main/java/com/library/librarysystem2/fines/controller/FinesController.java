package com.library.librarysystem2.fines.controller;

import com.library.librarysystem2.fines.service.FinesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fines")
public class FinesController {

    @Autowired
    FinesService finesService;

        // still working on this - Deryck
}
