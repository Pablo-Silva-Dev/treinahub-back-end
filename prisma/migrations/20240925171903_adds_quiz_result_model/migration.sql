-- CreateTable
CREATE TABLE "QuizResult" (
    "id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "quiz_attempt_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_quiz_questions" INTEGER NOT NULL,
    "total_correct_questions" INTEGER NOT NULL,
    "total_correct_questions_percentage" INTEGER NOT NULL,

    CONSTRAINT "QuizResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizResult_quiz_attempt_id_key" ON "QuizResult"("quiz_attempt_id");

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_quiz_attempt_id_fkey" FOREIGN KEY ("quiz_attempt_id") REFERENCES "QuizAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
