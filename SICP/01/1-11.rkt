#lang racket
(require rackunit)
(require racket/trace)

(define kinds
  (hash 1 1
        2 5
        3 10
        4 25
        5 50))

(define (cc amount coins acc)
  (writeln (format "~a ~a ~a" amount coins acc))
  (cond
    [(= coins 1) (+ acc 1)]
    [(= amount 0) (+ acc 1)]
    [(or (< amount 0) (= coins 0)) 0]
    [else (cc (- amount (hash-ref kinds coins))
              (- coins 1)
              (cc amount (- coins 1) acc))]))

(trace cc)
(check-equal? (cc 100 5 0) 292 "Possibilities")