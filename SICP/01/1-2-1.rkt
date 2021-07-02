#lang racket

(define (factorial-rec n)
  (if (= n 1) 
      1 
      (* n (factorial-rec (- n 1)))))

; Eval
; (factorial-rec 6)
; (* 6 (factorial-rec 5))
; (* 6 (* 5 (factorial-rec 4)))
; (* 6 (* 5 (* 4 (factorial-rec 3))))
; (* 6 (* 5 (* 4 (* 3 (factorial-rec 2)))))
; (* 6 (* 5 (* 4 (* 3 (* 2 (factorial-rec 1))))))
; (* 6 (* 5 (* 4 (* 3 (* 2 1)))))
; (* 6 (* 5 (* 4 (* 3 2))))
; (* 6 (* 5 (* 4 6)))
; (* 6 (* 5 24))
; (* 6 120)
; 720 

(factorial 6)

(define (factorial-iter n) 
  (fact-iter 1 1 n))

(define (fact-iter product counter max-count)
  (if (> counter max-count)
      product
      (fact-iter (* counter product) (+ counter 1) max-count)))

; (factorial 6)
; (fact-iter 1 1 6)
; (fact-iter 1 2 6)
; (fact-iter 2 3 6)
; (fact-iter 6 4 6)
; (fact-iter 24 5 6)
; (fact-iter 120 6 6)
; (fact-iter 720 7 6)
; 720

(factorial-iter 6)