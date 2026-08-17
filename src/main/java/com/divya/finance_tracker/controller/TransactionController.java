package com.divya.finance_tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.divya.finance_tracker.entity.Transaction;
import com.divya.finance_tracker.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin("*")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // Add transaction
    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return transactionService.addTransaction(transaction);
    }

    // Get all transactions for a user
    @GetMapping("/user/{userId}")
    public List<Transaction> getUserTransactions(@PathVariable Long userId) {
        return transactionService.getUserTransactions(userId);
    }

    // Update transaction
    @PutMapping("/{id}")
    public Transaction updateTransaction(
            @PathVariable Long id,
            @RequestBody Transaction transaction) {

        return transactionService.updateTransaction(id, transaction);
    }

    // Delete transaction
    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable Long id) {

        boolean deleted = transactionService.deleteTransaction(id);

        if (deleted) {
            return "Transaction deleted successfully";
        }

        return "Transaction not found";
    }
}
