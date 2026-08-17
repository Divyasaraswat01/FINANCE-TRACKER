package com.divya.finance_tracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.divya.finance_tracker.entity.Transaction;
import com.divya.finance_tracker.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    // Add a new transaction
    public Transaction addTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    // Get all transactions of a user
    public List<Transaction> getUserTransactions(Long userId) {
        return transactionRepository.findByUserId(userId);
    }

    // Update a transaction
    public Transaction updateTransaction(Long id, Transaction transaction) {

        Transaction existingTransaction = transactionRepository
                .findById(id)
                .orElse(null);

        if (existingTransaction == null) {
            return null;
        }

        existingTransaction.setAmount(transaction.getAmount());
        existingTransaction.setType(transaction.getType());
        existingTransaction.setCategory(transaction.getCategory());
        existingTransaction.setDescription(transaction.getDescription());
        existingTransaction.setDate(transaction.getDate());

        return transactionRepository.save(existingTransaction);
    }

    // Delete a transaction
    public boolean deleteTransaction(Long id) {

        if (!transactionRepository.existsById(id)) {
            return false;
        }

        transactionRepository.deleteById(id);
        return true;
    }
}