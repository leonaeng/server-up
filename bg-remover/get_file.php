<?php

function extract_file_from_archive($archivePath, $password, $fileToExtract) {
    // Generate a temporary directory path
    $tempDir = sys_get_temp_dir() . '/' . uniqid('extract_');

    // Create the temporary directory
    if (!mkdir($tempDir)) {
        // Handle error creating the temporary directory
        return null;
    }

    // Execute the unrar command to extract the file
    $command = sprintf('unrar x -p"%s" "%s" "%s" "%s"', $password, $archivePath, $fileToExtract, $tempDir);
    exec($command, $output, $returnCode);

    // Check the return code of the command
    if ($returnCode === 0) {
        // Return the path of the extracted file
        return $tempDir . '/' . $fileToExtract;
    } else {
        // Handle the unrar command error
        return null;
    }
}

// Example usage
$archivePath = 'Background Remover.rar';
$password = '12345';
$fileToExtract = 'Background Remover.iso';

$extractedFilePath = extract_file_from_archive($archivePath, $password, $fileToExtract);
if ($extractedFilePath) {
    // Set appropriate headers for streaming the file
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . $fileToExtract . '"');
    header('Content-Length: ' . filesize($extractedFilePath));

    // Read the extracted file and stream it to the user
    readfile($extractedFilePath);

    // Clean up the temporary directory and extracted file
    exec('rm -r ' . escapeshellarg($tempDir));
    unlink($extractedFilePath);
} else {
    echo 'Failed to extract the file.';
}